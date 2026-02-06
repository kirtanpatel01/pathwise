import React from 'react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from './ui/sidebar'
import { ModeToggle } from './mode-toggle'
import { Kbd } from './ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

function SecondaryNav({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <ModeToggle asChild />
            </SidebarMenuButton>
            <Tooltip>
              <SidebarMenuBadge className='pointer-events-auto'>
                <TooltipTrigger>
                  <Kbd>D</Kbd>
                </TooltipTrigger>
              </SidebarMenuBadge>
              <TooltipContent className='w-32 text-center'>
                Toggle Dark Mode using 'D' key
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default SecondaryNav
