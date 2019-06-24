/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import EditorJS from '@editorjs/editorjs';
import './style.scss';
import { parcer } from './widgetParcer';
import {
  slotWidget, headerOffer, meta, testData
} from './constants';

class ReactEditor extends Component {
  editor;

  save = () => {
    this.editor
      .save()
      .then((outputData) => {
        console.log('Article data: ', outputData);
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  };

  render() {
    this.editor = new EditorJS({
      holder: 'editor',
      autofocus: true,
      tools: {
        headerOfferWidget: {
          class: parcer.generateClassFromWidget(slotWidget)
        },
        slotWidget: {
          class: parcer.generateClassFromWidget(headerOffer)
        },
        metaWidget: {
          class: parcer.generateClassFromWidget(meta)
        }
      },
      data: testData
    });

    return (
      <>
        <button onClick={() => this.save()}>save</button>
        <div id="editor" className="editor" />
      </>
    );
  }
}

export default ReactEditor;
