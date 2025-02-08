import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonBackButton,
  IonText,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { Media as NGXMedia, MediaObject } from "@awesome-cordova-plugins/media/ngx";
import { File as NGXFile } from '@awesome-cordova-plugins/file/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import WaveSurfer from 'wavesurfer.js'
// @ts-ignore
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'


@Component({
  selector: 'app-recorder-screen',
  templateUrl: './recorder-screen.component.html',
  styleUrls: ['./recorder-screen.component.scss'],
  providers: [
    NGXMedia,
    NGXFile,
  ],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonBackButton,
    IonText,
    IonIcon,
    IonContent,
  ]
})
export class RecorderScreenComponent  implements OnInit {

  private _recorder: MediaObject | null = null;
  private _record: any = null;

  constructor(
    private _platform: Platform,
    private _media: NGXMedia,
    private _file: NGXFile,
  ) { 
    this._platform.ready().then(() => {

    });
  }

  ngOnInit() {
    console.log(this.suffer());
    this._recorder = this._media.create('my_file.mp3');
    
    if (this._recorder && this._recorder != null) {
      // this._recorder?.startRecord();
      // console.log('start record');

      this._recorder.onStatusUpdate.subscribe(status => console.log(status));
      this._recorder.onSuccess.subscribe(() => console.log('record success'));
      this._recorder.onError.subscribe(error => console.log(error));

      this._recorder.successCallback = (value: any) => {
        console.log('success callback', value);
      }

      this._recorder.statusCallback = (value: any) => {
        console.log('status callback', value);
      }

      this._recorder.getCurrentAmplitude().then((value) => {
        console.log('amplited', value);
      })
      
      // window.setTimeout(() => {
      //   this._recorder?.stopRecord();
      //   console.log('stop record');
      // }, 10000);
    }
  }

  suffer() {
    // @ts-ignore
    let wavesurfer: any;
    let scrollingWaveform = false;
    let continuousWaveform = true;

    const createWaveSurfer = () => {
      // Destroy the previous wavesurfer instance
      // @ts-ignore
      if (wavesurfer) {
        wavesurfer.destroy()
      }

      // Create a new Wavesurfer instance
      wavesurfer = WaveSurfer.create({
        container: '#mic',
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
        // Set a bar width
        barWidth: 2,
        // Optionally, specify the spacing between bars
        barGap: 1,
        // And the bar radius
        barRadius: 2,
      })

      // Initialize the Record plugin
      const recordOptions: RecordPlugin.RecordPluginOptions = {
        continuousWaveform: false,
        scrollingWaveform: false,
        scrollingWaveformWindow: 1,
        renderRecordedAudio: false,
        continuousWaveformDuration: 0,
        mimeType: 'audio/webm',
      }
      
      this._record = wavesurfer.registerPlugin(
        RecordPlugin.create(recordOptions),
      )

      // @ts-ignore
      pauseButton.style.display = 'none'
      // @ts-ignore
      recButton.textContent = 'Record'

      // record end
      this._record.on('record-end', () => {
        this._recorder?.stopRecord();
      });

      // listen data
      this._record.on('record-data-available', (blob: Blob) => {
        console.log(blob);
      });

      // listen progress
      this._record.on('record-progress', async (time: any) => {
        updateProgress(time);
      });
    }

    const progress = document.querySelector('#progress')
    // @ts-ignore
    const updateProgress = (time) => {
      // time will be in milliseconds, convert it to mm:ss format
      const formattedTime = [
        Math.floor((time % 3600000) / 60000), // minutes
        Math.floor((time % 60000) / 1000), // seconds
      ]
        .map((v) => (v < 10 ? '0' + v : v))
        .join(':')
      // @ts-ignore
      progress.textContent = formattedTime
    }

    const pauseButton = document.querySelector('#pause')
    // @ts-ignore
    pauseButton.onclick = () => {
      if (this._record.isPaused()) {
        this._record.resumeRecording();
        this._recorder?.resumeRecord();
        // @ts-ignore
        pauseButton.textContent = 'Pause'
        return
      }

      this._recorder?.pause();
      this._record.pauseRecording();
      // @ts-ignore
      pauseButton.textContent = 'Resume'
    }

    const micSelect = document.querySelector('#mic-select')
    {
      // Mic selection
      // @ts-ignore
      RecordPlugin.getAvailableAudioDevices().then((devices) => {
        // @ts-ignore
        devices.forEach((device) => {
          const option = document.createElement('option')
          option.value = device.deviceId
          option.text = device.label || device.deviceId
          // @ts-ignore
          micSelect.appendChild(option)
        })
      })
    }
    // Record button
    const recButton = document.querySelector('#record')

    // @ts-ignore
    recButton.onclick = () => {
      if (this._record.isRecording() || this._record.isPaused()) {
        this._record.stopRecording();
        this._recorder?.stopRecord();
        // @ts-ignore
        recButton.textContent = 'Record'
        // @ts-ignore
        pauseButton.style.display = 'none'
        return
      }

      // @ts-ignore
      recButton.disabled = true

      // reset the wavesurfer instance

      // get selected device
      // @ts-ignore
      const deviceId = micSelect.value
      this._record.startRecording({ deviceId }).then(() => {
        // @ts-ignore
        recButton.textContent = 'Stop'
        // @ts-ignore
        recButton.disabled = false
        // @ts-ignore
        pauseButton.style.display = 'inline'
      });

      this._recorder?.startRecord();
    }

    // @ts-ignore
    document.querySelector('#scrollingWaveform').onclick = (e) => {
      scrollingWaveform = e.target.checked
      if (continuousWaveform && scrollingWaveform) {
        continuousWaveform = false
        // @ts-ignore
        document.querySelector('#continuousWaveform').checked = false
      }
      createWaveSurfer()
    }

    // @ts-ignore
    document.querySelector('#continuousWaveform').onclick = (e) => {
      continuousWaveform = e.target.checked
      if (continuousWaveform && scrollingWaveform) {
        scrollingWaveform = false
        // @ts-ignore
        document.querySelector('#scrollingWaveform').checked = false
      }
      createWaveSurfer()
    }

    createWaveSurfer();
  }

}
