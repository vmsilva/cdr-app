import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from "react-native-track-player";

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks(queue: any, posicao: number) {
  try{
    await TrackPlayer.add(queue);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  
    if (posicao !== undefined && posicao > 0) {
      await TrackPlayer.skip(posicao);
    }
 

  }catch(error){
    console.log(error)
  }
}

export async function removerQueues() {
  try{
    await TrackPlayer.reset();
  }catch(error){
    console.log(error)
  }
  
}

export async function addTracksOLD(queue: any, posicao: number) {
  await TrackPlayer.add(queue);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);

  if (posicao !== undefined && posicao > 0) {
    await TrackPlayer.skip(posicao);
  }
}

export async function removerQueuesOLD() {
  await TrackPlayer.reset();
}

export async function playbackService() {
  try {
    // TODO: Attach remote event handlers
    await TrackPlayer.addEventListener(Event.RemotePlay, () => {
      console.log("play");
      TrackPlayer.play();
    });

    await TrackPlayer.addEventListener(Event.RemotePause, () => {
      console.log("pause");
      TrackPlayer.pause();
      //setIsPlayingGlobal(false)
    });

    await TrackPlayer.addEventListener(Event.RemoteNext, () => {
      //await
      //TrackPlayer.SkipToNext();
      const skipToNext = TrackPlayer.skipToNext();
      if (!skipToNext) {
        // Caso não seja possível pular para a próxima faixa, reinicie a reprodução
        TrackPlayer.skip('1');
    }
    });

    await TrackPlayer.addEventListener(Event.RemotePrevious, () => {
      // await
      //TrackPlayer.SkipToPrevious();

      const skipToPrevious = TrackPlayer.skipToPrevious();
      if (!skipToPrevious) {
        // Caso não seja possível voltar para a faixa anterior, reinicie a reprodução
        TrackPlayer.skip('1');
      }
    });
  } catch (error) {
    console.log("trackplayer service error:", error);
  }
}
