// create Agora client
var client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

var localTracks = {
  videoTrack: null,
  audioTrack: null
};
var remoteUsers = {};
// Agora client options
var options = {
  appid: null,
  channel: null,
  uid: null,
  token: null
};

const APP_ID = "a6ad7658ffe9426ba9e88950390b5970"; //the app ID from agora for this project

//upon clicking the join button
$("#join-form").submit(async function (e) {
  e.preventDefault();
  $("#join").attr("disabled", true); //you can't join twice

  try {
    options.appid = APP_ID; //get the constant app ID set earlier
    this.http.post('/api/getNextSession', sendJson).subscribe(response => {
        let json = JSON.parse(JSON.stringify(response))
        console.log(json);
        if (json.response == "success") {
            options.channel = json.session_id;
        }
    });

    await join(); //run the join function to join the session
    
  } catch (error) {
    console.error("Could not join the session.");
  } finally {
    $("#leave").attr("disabled", false);
  }
})

//on clicking the leave button
$("#leave").click(function (e) {
  leave();
})

//join the session
async function join() {

  //add event listener to play remote tracks when remote user publishs.
  client.on("user-published", handleUserPublished);
  client.on("user-unpublished", handleUserUnpublished);

  //join a channel and create local tracks, we can use Promise.all to run them concurrently
  [ options.uid, localTracks.audioTrack, localTracks.videoTrack ] = await Promise.all([
    client.join(options.appid, options.channel, options.token || null), //join the channel
    AgoraRTC.createMicrophoneAudioTrack(), //create local audio tracks with user microphone
    AgoraRTC.createCameraVideoTrack() //create local video track with user camera
  ]);
  
  //play local video track
  localTracks.videoTrack.play("local-player");
  $("#local-player-name").text(`localVideo(${options.uid})`);

  //publish local tracks to channel
  await client.publish(Object.values(localTracks));
  console.log("publish success");
}

//leave the session
async function leave() {
  for (trackName in localTracks) {
    var track = localTracks[trackName];
    if(track) {
      track.stop();
      track.close();
      localTracks[trackName] = undefined;
    }
  }

  //remove remote users and player views
  remoteUsers = {};
  $("#remote-playerlist").html("");

  await client.leave(); //leave the channel

  $("#local-player-name").text("");
  $("#join").attr("disabled", false);
  $("#leave").attr("disabled", true);
  console.log("client leaves channel success");
}

//subscribe to a remote user
async function subscribe(user, mediaType) {
  const uid = user.uid;

  await client.subscribe(user, mediaType); 

  console.log("subscribe success");

  if (mediaType === 'video') {
    const player = $(`
      <div id="player-wrapper-${uid}">
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
    $("#remote-playerlist").append(player);
    user.videoTrack.play(`player-${uid}`);
  }

  if (mediaType === 'audio') {
    user.audioTrack.play();
  }
}

function handleUserPublished(user, mediaType) {
  const id = user.uid;
  remoteUsers[id] = user;
  subscribe(user, mediaType);
}

function handleUserUnpublished(user) {
  const id = user.uid;
  delete remoteUsers[id];
  $(`#player-wrapper-${id}`).remove();
}