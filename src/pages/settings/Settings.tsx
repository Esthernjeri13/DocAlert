import React from 'react';
import AppShell from '../../components/layout/AppShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Bell, Mail, Moon, Sun, User } from 'lucide-react';

export default function Settings() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
        
        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <User className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input type="text" placeholder="John Doe" className="max-w-md" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input type="email" placeholder="john@example.com" className="max-w-md" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Zone
                  </label>
                  <Select className="max-w-md">
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="CST">Central Time</option>
                    <option value="PST">Pacific Time</option>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Bell className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="peer sr-only" id="email-notifications" />
                    <label
                      htmlFor="email-notifications"
                      className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition peer-checked:bg-blue-600"
                    >
                      <span className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white transition-transform peer-checked:translate-x-6" />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <h3 className="font-medium text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-500">Receive instant notifications</p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="peer sr-only" id="push-notifications" />
                    <label
                      htmlFor="push-notifications"
                      className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition peer-checked:bg-blue-600"
                    >
                      <span className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white transition-transform peer-checked:translate-x-6" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Theme Settings */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Sun className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Theme Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 max-w-md">
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center"
                  >
                    System
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}