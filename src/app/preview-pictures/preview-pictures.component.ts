import { Photo } from './../classes/Photo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Optional, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-pictures',
  templateUrl: './preview-pictures.component.html',
  styleUrls: ['./preview-pictures.component.css']
})
export class PreviewPicturesComponent implements OnInit {

  pictures: Photo[];
  imgURL: string;
  noImagesFound: boolean;

  constructor(
    public dialogRef: MatDialogRef<PreviewPicturesComponent>,
    private _sanitizer: DomSanitizer,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.pictures = data.pictures;
      this.imgURL =  data.imgUrl;
      this.noImagesFound = data.noImagesFound;
    }
    

  ngOnInit() {

   
    
  }


  getBackground(imgURL) {
    return this._sanitizer.bypassSecurityTrustUrl(`${imgURL}`);

}

}
