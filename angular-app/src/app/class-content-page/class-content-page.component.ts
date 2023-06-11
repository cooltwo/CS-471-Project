import { Component } from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-class-content-page',
  templateUrl: './class-content-page.component.html',
  styleUrls: ['./class-content-page.component.css']
})
export class ClassContentPageComponent {

  fileList = [];

  constructor(private currentUserService: CurrentUserService, private http: HttpClient) {
    this.updateFileList();
  }

  updateFileList() {
    let sendJson = {
      username: this.currentUserService.username,
    };
    console.log(sendJson);
    this.http.post('/api/listUserFiles', sendJson).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "success") {
        this.fileList = json.files;
      }
    })
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if(file) {
      const formData = new FormData();
      formData.append("username", this.currentUserService.username);
      formData.append("file", file);
      this.http.post("/api/contentUpload", formData).subscribe(response => {
        let json = JSON.parse(JSON.stringify(response))
        console.log(json);
        if(json.response == "success") {
          this.updateFileList();
        }
      });
    }
  }

  downloadFile(i: number) {
    let fileName = this.fileList[i];
    let sendJson = {
      username: this.currentUserService.username,
      fileName: fileName,
    };
    this.http.post("/api/downloadFile", sendJson, { responseType: 'blob' }).subscribe(file => {
      const blob = new Blob([file]); // you can change the type
      const url= window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  removeFile(i: number) {
    let fileName = this.fileList[i];
    let sendJson = {
      username: this.currentUserService.username,
      fileName: fileName,
    };
    this.http.post("/api/removeContent", sendJson).subscribe(response => {
      let json = JSON.parse(JSON.stringify(response))
      console.log(json);
      if(json.response == "success") {
        this.updateFileList();
      }
    });
  }
}
