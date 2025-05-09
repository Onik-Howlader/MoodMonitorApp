import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';
import '../models/mood_entry.dart';

class MoodEntryForm extends StatefulWidget {
  final MoodEntry? entry;
  final Function(MoodEntry) onSubmit;

  const MoodEntryForm({
    Key? key,
    this.entry,
    required this.onSubmit,
  }) : super(key: key);

  @override
  _MoodEntryFormState createState() => _MoodEntryFormState();
}

class _MoodEntryFormState extends State<MoodEntryForm> {
  final _formKey = GlobalKey<FormState>();
  late String _selectedMood;
  late TextEditingController _noteController;
  final _uuid = Uuid();

  @override
  void initState() {
    super.initState();
    _selectedMood = widget.entry?.mood ?? 'Happy';
    _noteController = TextEditingController(text: widget.entry?.note ?? '');
  }

  @override
  void dispose() {
    _noteController.dispose();
    super.dispose();
  }

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      final entry = MoodEntry(
        id: widget.entry?.id ?? _uuid.v4(),
        mood: _selectedMood,
        note: _noteController.text.trim(),
        timestamp: widget.entry?.timestamp ?? DateTime.now(),
      );
      widget.onSubmit(entry);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          DropdownButtonFormField<String>(
            value: _selectedMood,
            decoration: const InputDecoration(
              labelText: 'How are you feeling?',
              border: OutlineInputBorder(),
            ),
            items: ['Happy', 'Sad', 'Angry', 'Anxious', 'Calm']
                .map((mood) => DropdownMenuItem(
                      value: mood,
                      child: Text(mood),
                    ))
                .toList(),
            onChanged: (value) {
              if (value != null) {
                setState(() {
                  _selectedMood = value;
                });
              }
            },
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please select a mood';
              }
              return null;
            },
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _noteController,
            decoration: const InputDecoration(
              labelText: 'Add a note (optional)',
              border: OutlineInputBorder(),
            ),
            maxLines: 3,
            validator: (value) {
              if (value != null && value.length > 500) {
                return 'Note cannot exceed 500 characters';
              }
              return null;
            },
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: _submitForm,
            child: Text(widget.entry == null ? 'Add Entry' : 'Update Entry'),
          ),
        ],
      ),
    );
  }
} 