import { CanDeactivateFn } from '@angular/router';

export const leaveRecordingGuard: CanDeactivateFn<unknown> = (component: any, currentRoute, currentState, nextState) => {
  return component.cancelRecording(nextState.url);
};
