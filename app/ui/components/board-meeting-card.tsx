"use client";

import React from 'react';
import { useMeetingsStore, type Meeting } from "@/app/store/use-meetings-store";
import { IconEdit } from "../svg/icon-edit";
import { IconClock } from "../svg/icon-clock";
import { IconCalender } from "../svg/icon-calendar";
import { IconUserMeeting } from "../svg/icon-user-meeting";
import { IconDelete } from "../svg/icon-delete";
import { IconTeam } from "../svg/icon-team";

interface BoardMeetingCardProps {
  meeting: Meeting;
}

export const BoardMeetingCard: React.FC<BoardMeetingCardProps> = ({ meeting }) => {
  const { deleteMeeting, setSelectedMeetingId } = useMeetingsStore();

  if (!meeting?._id) {
    return null;
  }
  
  const handleEdit = () => {
    setSelectedMeetingId(meeting._id);
  };

  const handleDelete = () => {
    deleteMeeting(meeting._id);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-colorPrimary overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm text-gray-600">
              M
            </div>
            <span className="text-gray-600 text-sm">R</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconClock color="#6B7280" />
            <span>{
              meeting.startTime && meeting.endTime
                ? `${new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(meeting.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : "No time set"
              }</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconCalender color="#6B7280" />
            <span>{new Date(meeting.startTime).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <IconUserMeeting color="#6B7280" />
            <span>{meeting.participants.length} attendees</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button 
            onClick={handleEdit}
            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <IconEdit />
          </button>
          <button 
            onClick={handleDelete}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <IconDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

BoardMeetingCard.displayName = "BoardMeetingCard";
