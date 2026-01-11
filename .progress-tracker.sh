#!/bin/bash

# DSK Interior - Progress Tracker Script
# Quick script to update progress and add notes

PROGRESS_FILE="PROGRESS.md"
NOTES_FILE="NOTES.md"

echo "DSK Interior - Progress Tracker"
echo "================================"
echo ""
echo "1. View Progress"
echo "2. Add Note to Progress"
echo "3. Add Quick Note"
echo "4. Mark Task Complete"
echo "5. Add New Task"
echo ""

read -p "Select option (1-5): " option

case $option in
  1)
    cat "$PROGRESS_FILE"
    ;;
  2)
    read -p "Enter note: " note
    echo "" >> "$PROGRESS_FILE"
    echo "### $(date '+%Y-%m-%d')" >> "$PROGRESS_FILE"
    echo "- $note" >> "$PROGRESS_FILE"
    echo "Note added to PROGRESS.md"
    ;;
  3)
    read -p "Enter quick note: " note
    echo "" >> "$NOTES_FILE"
    echo "- **$(date '+%Y-%m-%d %H:%M')**: $note" >> "$NOTES_FILE"
    echo "Quick note added to NOTES.md"
    ;;
  4)
    echo "Open PROGRESS.md and mark tasks as complete with [x]"
    ;;
  5)
    read -p "Enter new task: " task
    read -p "Enter phase (e.g., Phase 5): " phase
    echo "" >> "$PROGRESS_FILE"
    echo "### $phase" >> "$PROGRESS_FILE"
    echo "- [ ] $task" >> "$PROGRESS_FILE"
    echo "Task added to PROGRESS.md"
    ;;
  *)
    echo "Invalid option"
    ;;
esac




