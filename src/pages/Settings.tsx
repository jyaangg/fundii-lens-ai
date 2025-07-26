import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Sun,
  Globe,
  Mail,
  Lock,
  Key
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsState {
  darkMode: boolean;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  systemAlerts: boolean;
  processingNotifications: boolean;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    emailNotifications: true,
    systemAlerts: true,
    processingNotifications: true,
  });

  // Check for saved dark mode preference or default to false
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const isDarkMode = savedDarkMode ? JSON.parse(savedDarkMode) : false;
    
    setSettings(prev => ({ ...prev, darkMode: isDarkMode }));
    
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleSettingChange = (key: keyof SettingsState, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Handle dark mode toggle specifically
    if (key === 'darkMode' && typeof value === 'boolean') {
      // Save to localStorage
      localStorage.setItem('darkMode', JSON.stringify(value));
      
      // Apply dark mode class to document
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  return (
    <div className='space-y-6 animate-fade-in'>
      <div className='bg-gradient-primary rounded-lg p-6 text-primary-foreground shadow-medium'>
        <div className='flex items-center gap-3 mb-2'>
          <SettingsIcon className='w-8 h-8' />
          <h1 className='text-3xl font-bold'>Settings</h1>
        </div>
        <p className='text-primary-foreground/90'>
          Configure your application preferences and account settings
        </p>
      </div>

      <div className='space-y-6'>
          <Card className='shadow-soft'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Sun className='w-5 h-5' />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your application
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Dark Mode</Label>
                  <p className='text-sm text-muted-foreground'>
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-soft'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Globe className='w-5 h-5' />
                Localization
              </CardTitle>
              <CardDescription>
                Set your language and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='language'>Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => handleSettingChange('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select language' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='en'>English</SelectItem>
                      <SelectItem value='es'>Spanish</SelectItem>
                      <SelectItem value='fr'>French</SelectItem>
                      <SelectItem value='de'>German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='timezone'>Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => handleSettingChange('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select timezone' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='UTC'>UTC</SelectItem>
                      <SelectItem value='EST'>Eastern Time</SelectItem>
                      <SelectItem value='PST'>Pacific Time</SelectItem>
                      <SelectItem value='CST'>Central Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='shadow-soft'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='w-5 h-5' />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input id='firstName' placeholder='Enter your first name' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input id='lastName' placeholder='Enter your last name' />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input id='email' type='email' placeholder='Enter your email address' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='company'>Company</Label>
                <Input id='company' placeholder='Enter your company name' />
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-soft'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Lock className='w-5 h-5' />
                Security
              </CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='currentPassword'>Current Password</Label>
                <Input id='currentPassword' type='password' placeholder='Enter current password' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='newPassword'>New Password</Label>
                <Input id='newPassword' type='password' placeholder='Enter new password' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <Input id='confirmPassword' type='password' placeholder='Confirm new password' />
              </div>
              <Button variant='outline' className='w-full'>
                <Key className='w-4 h-4 mr-2' />
                Update Password
              </Button>
            </CardContent>
          </Card>
          <Card className='shadow-soft'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Mail className='w-5 h-5' />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Choose which notifications you want to receive via email
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Email Notifications</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive general notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>System Alerts</Label>
                  <p className='text-sm text-muted-foreground'>
                    Get notified about system issues and updates
                  </p>
                </div>
                <Switch
                  checked={settings.systemAlerts}
                  onCheckedChange={(checked) => handleSettingChange('systemAlerts', checked)}
                />
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Processing Notifications</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive updates on document processing status
                  </p>
                </div>
                <Switch
                  checked={settings.processingNotifications}
                  onCheckedChange={(checked) => handleSettingChange('processingNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
      </div>

      <div className='flex justify-end gap-4'>
        <Button variant='outline'>Reset to Defaults</Button>
        <Button variant='gradient' onClick={handleSave}>
          <SettingsIcon className='w-4 h-4 mr-2' />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;