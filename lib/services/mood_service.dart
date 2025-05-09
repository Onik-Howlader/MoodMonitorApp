import 'dart:convert';
import 'package:shared_preferences.dart';
import '../models/mood_entry.dart';

class MoodService {
  static const String _storageKey = 'mood_entries';
  final SharedPreferences _prefs;

  MoodService(this._prefs);

  Future<List<MoodEntry>> getMoodEntries() async {
    try {
      final String? entriesJson = _prefs.getString(_storageKey);
      if (entriesJson == null) return [];

      final List<dynamic> entries = json.decode(entriesJson);
      return entries.map((entry) => MoodEntry.fromJson(entry)).toList();
    } catch (e) {
      print('Error getting mood entries: $e');
      return [];
    }
  }

  Future<void> addMoodEntry(MoodEntry entry) async {
    try {
      final List<MoodEntry> entries = await getMoodEntries();
      entries.add(entry);
      await _saveEntries(entries);
    } catch (e) {
      print('Error adding mood entry: $e');
      rethrow;
    }
  }

  Future<void> updateMoodEntry(MoodEntry updatedEntry) async {
    try {
      final List<MoodEntry> entries = await getMoodEntries();
      final index = entries.indexWhere((entry) => entry.id == updatedEntry.id);
      if (index != -1) {
        entries[index] = updatedEntry;
        await _saveEntries(entries);
      }
    } catch (e) {
      print('Error updating mood entry: $e');
      rethrow;
    }
  }

  Future<void> deleteMoodEntry(String id) async {
    try {
      final List<MoodEntry> entries = await getMoodEntries();
      entries.removeWhere((entry) => entry.id == id);
      await _saveEntries(entries);
    } catch (e) {
      print('Error deleting mood entry: $e');
      rethrow;
    }
  }

  Future<void> _saveEntries(List<MoodEntry> entries) async {
    try {
      final String entriesJson = json.encode(entries.map((e) => e.toJson()).toList());
      await _prefs.setString(_storageKey, entriesJson);
    } catch (e) {
      print('Error saving entries: $e');
      rethrow;
    }
  }
} 