import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { ReminderSettings as ReminderSettingsType, ReminderChannel } from '../../types';
import Button from '../ui/Button';
import Select from '../ui/Select';

interface ReminderSettingsProps {
  settings: ReminderSettingsType;
  onChange: (settings: ReminderSettingsType) => void;
}

const ReminderSettings: React.FC<ReminderSettingsProps> = ({ settings, onChange }) => {
  const [newScheduleType, setNewScheduleType] = useState<'days' | 'hours' | 'minutes'>('days');
  const [newScheduleValue, setNewScheduleValue] = useState<number>(1);
  
  const channelOptions = [
    { value: 'sms', label: 'SMS' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' },
    { value: 'push', label: 'Push Notification' },
  ];
  
  const scheduleTypeOptions = [
    { value: 'days', label: 'Days before' },
    { value: 'hours', label: 'Hours before' },
    { value: 'minutes', label: 'Minutes before' },
  ];
  
  const handleChannelChange = (channel: ReminderChannel, checked: boolean) => {
    let updatedChannels: ReminderChannel[];
    
    if (checked) {
      updatedChannels = [...settings.channels, channel];
    } else {
      updatedChannels = settings.channels.filter(c => c !== channel);
    }
    
    onChange({
      ...settings,
      channels: updatedChannels,
    });
  };
  
  const addSchedule = () => {
    onChange({
      ...settings,
      schedule: [
        ...settings.schedule,
        {
          type: newScheduleType,
          value: newScheduleValue,
          sent: false,
        },
      ],
    });
  };
  
  const removeSchedule = (index: number) => {
    const updatedSchedule = [...settings.schedule];
    updatedSchedule.splice(index, 1);
    
    onChange({
      ...settings,
      schedule: updatedSchedule,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-2">Reminder Channels</h3>
        <div className="space-y-2">
          {channelOptions.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                id={`channel-${option.value}`}
                checked={settings.channels.includes(option.value as ReminderChannel)}
                onChange={(e) => handleChannelChange(option.value as ReminderChannel, e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor={`channel-${option.value}`} className="ml-2 text-sm text-neutral-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-neutral-700">Reminder Schedule</h3>
        </div>
        
        <div className="bg-neutral-50 p-3 rounded-md border border-neutral-200 mb-4">
          {settings.schedule.length > 0 ? (
            <ul className="space-y-2">
              {settings.schedule.map((schedule, index) => (
                <li key={index} className="flex items-center justify-between bg-white p-2 rounded border border-neutral-200">
                  <span className="text-sm text-neutral-800">
                    {schedule.value} {schedule.type} before appointment
                  </span>
                  <button
                    onClick={() => removeSchedule(index)}
                    className="text-error-500 hover:text-error-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500 text-center py-2">No reminders scheduled</p>
          )}
        </div>
        
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label htmlFor="schedule-value" className="block text-xs text-neutral-500 mb-1">
              Time
            </label>
            <input
              type="number"
              id="schedule-value"
              min="1"
              value={newScheduleValue}
              onChange={(e) => setNewScheduleValue(parseInt(e.target.value, 10))}
              className="block w-full px-3 py-2 bg-white border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="schedule-type" className="block text-xs text-neutral-500 mb-1">
              Unit
            </label>
            <Select
              id="schedule-type"
              options={scheduleTypeOptions}
              value={newScheduleType}
              onChange={(value) => setNewScheduleType(value as 'days' | 'hours' | 'minutes')}
            />
          </div>
          
          <Button
            variant="primary"
            size="md"
            onClick={addSchedule}
            icon={<PlusCircle size={16} />}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReminderSettings;