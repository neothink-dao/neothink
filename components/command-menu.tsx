import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  BookOpen,
  Search,
  Command,
  FileText,
  Folder,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquare,
  PlusCircle,
  Plus,
  Star,
  Sun,
  Moon,
  Laptop,
  Bell,
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const { setTheme } = useTheme()
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpenChange])

  const runCommand = (command: () => void) => {
    onOpenChange(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Links">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard'))}
          >
            <Command className="mr-2 h-4 w-4" />
            <span>Go to Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/courses'))}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Browse Courses</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/bookmarks'))}
          >
            <Star className="mr-2 h-4 w-4" />
            <span>View Bookmarks</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Tools">
          <CommandItem onSelect={() => runCommand(() => router.push('/search'))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/notes'))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Notes</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/resources'))}>
            <Folder className="mr-2 h-4 w-4" />
            <span>Resources</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>System</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => router.push('/settings/profile'))}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/settings/account'))}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/settings/notifications'))}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notification Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Support">
          <CommandItem onSelect={() => runCommand(() => router.push('/help'))}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help Center</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/contact'))}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact Support</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/feedback'))}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Send Feedback</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
} 