import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

export default function FollowCursorTooltips({showPath}) {
  return (
    <Tooltip title="Click to copy the path" followCursor arrow>
      <div className='pathArea' onClick={(async (e)=>{await navigator.clipboard.writeText(showPath())})}><span>Current Path: {showPath()}</span></div>
    </Tooltip>
  );
}
