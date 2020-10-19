import xapi from 'xapi';

// Zoom In-Call Controls

//Function to send the DTMF tones during the call.  This receives the DTMF tones from the Event Listenter below.

const sleep = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});
async function sendDTMF(code, message) {
    console.log(message);

    try {
        const Level = await xapi.Status.Audio.Volume.get();
        await xapi.Command.Audio.Volume.Set({
            Level: "30",
        });
        console.log("Volume set to 30");

        await sleep(200);
        xapi.Command.Call.DTMFSend({
            DTMFString: code,
        });
        console.log("DTMF Values Sent")

        await sleep(750);
        await xapi.Command.Audio.Volume.Set({
            Level
        });
        console.log("Volume Set Back to " + Level)

    } catch (error) {
        console.error(error);
    }
}

//Event Listener - In this listener we are checking against various Widget ID's to see if they are pressed, and if they are we then send the appropriate DTMF tones to the sendDTMF function listed above.  You can edit each of these to match your WigitID's and/or add/subtract addtional case statements.

xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
  if (event.Type !== 'pressed'){
    return;
  }
    switch (event.WidgetId) {
      case "changelayout":
        return sendDTMF(11, 'Change Layout was Pressed');
      
      case "audiomute":
        return sendDTMF(12, 'Audio was Pressed');
        
      case "videomute":
        return sendDTMF(14, 'Video Mute was Pressed');
        
      case "record":
        return sendDTMF(15, 'Record was Pressed');
        
      case "videonames":
        return sendDTMF(102, 'Show/Hide Names was Pressed');
        
      case "mute_on_entry":
        return sendDTMF(103, 'Mute on Entry was Pressed');
        
      case "participants_show":
        return sendDTMF(106, 'Show Participants was Pressed');
        
      case "exit":
        return sendDTMF("*", 'Exit was Pressed');
        
    }});

