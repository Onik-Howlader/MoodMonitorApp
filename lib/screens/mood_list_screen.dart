import 'package:flutter/material.dart';
import '../models/mood_entry.dart';
import '../services/mood_service.dart';
import '../widgets/mood_entry_form.dart';

class MoodListScreen extends StatefulWidget {
  final MoodService moodService;

  const MoodListScreen({
    Key? key,
    required this.moodService,
  }) : super(key: key);

  @override
  _MoodListScreenState createState() => _MoodListScreenState();
}

class _MoodListScreenState extends State<MoodListScreen> {
  List<MoodEntry> _entries = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadEntries();
  }

  Future<void> _loadEntries() async {
    try {
      setState(() {
        _isLoading = true;
        _error = null;
      });

      final entries = await widget.moodService.getMoodEntries();
      setState(() {
        _entries = entries;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Failed to load entries: $e';
        _isLoading = false;
      });
    }
  }

  Future<void> _addOrUpdateEntry(MoodEntry entry) async {
    try {
      if (_entries.any((e) => e.id == entry.id)) {
        await widget.moodService.updateMoodEntry(entry);
      } else {
        await widget.moodService.addMoodEntry(entry);
      }
      await _loadEntries();
      if (mounted) {
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error saving entry: $e')),
        );
      }
    }
  }

  Future<void> _deleteEntry(String id) async {
    try {
      await widget.moodService.deleteMoodEntry(id);
      await _loadEntries();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error deleting entry: $e')),
        );
      }
    }
  }

  void _showEntryForm([MoodEntry? entry]) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
          left: 16,
          right: 16,
          top: 16,
        ),
        child: MoodEntryForm(
          entry: entry,
          onSubmit: _addOrUpdateEntry,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mood Tracker'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadEntries,
          ),
        ],
      ),
      body: _buildBody(),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showEntryForm(),
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(_error!, style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _loadEntries,
              child: const Text('Retry'),
            ),
          ],
        ),
      );
    }

    if (_entries.isEmpty) {
      return const Center(
        child: Text('No entries yet. Add your first mood!'),
      );
    }

    return ListView.builder(
      itemCount: _entries.length,
      itemBuilder: (context, index) {
        final entry = _entries[index];
        return Dismissible(
          key: Key(entry.id),
          background: Container(
            color: Colors.red,
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.only(right: 16),
            child: const Icon(Icons.delete, color: Colors.white),
          ),
          direction: DismissDirection.endToStart,
          onDismissed: (_) => _deleteEntry(entry.id),
          child: ListTile(
            title: Text(entry.mood),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (entry.note.isNotEmpty) Text(entry.note),
                Text(
                  '${entry.timestamp.day}/${entry.timestamp.month}/${entry.timestamp.year}',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
            onTap: () => _showEntryForm(entry),
          ),
        );
      },
    );
  }
} 