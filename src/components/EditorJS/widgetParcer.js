/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
// import * as React from 'jsx-dom';

const stringType = (name, displayName) => {
  // <div className="property">
  //   <div className="property-label">{displayName}</div>
  //   <input type="text" name={name} />
  // </div>
  const prop = document.createElement('div');
  prop.innerHTML = 'easease';
  return prop;
};

// const imageType = (name, displayName) => (
//   <div className="property">
//     <div className="property-label">{displayName}</div>
//     <button name={name} onClick={() => console.log('buttonClicked')} />
//   </div>
// );

// const campaignImageType = (name, displayName) => (
//   <div className="property">
//     <div className="property-label">{displayName}</div>
//     <button name={name} onClick={() => console.log('buttonClicked')} />
//   </div>
// );

// const boolType = (name, displayName) => (
//   <div className="property">
//     <div className="property">{displayName}</div>
//     <label className="switch-wrap">
//       <input type="checkbox" name={name} />
//       <div className="switch" />
//     </label>
//   </div>
// );

// const dateType = (name, displayName) => (
//   <div className="property">
//     <div className="property">{displayName}</div>
//     <input type="date" name={name} />
//   </div>
// );

const generateProperty = ({ name, displayName, type }) => {
  switch (type) {
    case 'string':
      return stringType(name, displayName);
    case 'image':
      return imageType(name, displayName);
    case 'boolean':
      return boolType(name, displayName);
    case 'date':
      return dateType(name, displayName);
    case 'campaignImage':
      return campaignImageType(name, displayName);
    default:
      throw new Error('unrecognized type');
  }
};

/**
 * @param {Object} widgetObject object that should contain componentName displayName props
 */
const parceWidgetObjectView = ({ componentName, displayName, props }) => {
  console.log(componentName, displayName);
  const widget = document.createElement('div');
  widget.setAttribute('componentName', componentName);
  widget.className = `widget widget-${componentName}`;

  props.forEach((element) => {
    widget.appendChild(generateProperty(element));
  });

  return widget;
};

const inputSelect = (blockContent, name) => blockContent.querySelector(`[name=${name}]`).value;
const imageSelect = (blockContent, name) => {
  console.log(blockContent, name);
  return 'Image';
};

const selectDataFromProperty = (blockContent, { name, type }) => {
  switch (type) {
    case 'string':
      return inputSelect(blockContent, name);
    case 'image':
      return imageSelect(blockContent, name);
    case 'campaignImage':
      return imageSelect(blockContent, name);
    case 'boolean':
      return inputSelect(blockContent, name);
    case 'date':
      return inputSelect(blockContent, name);
    default:
      throw new Error('unrecognized type');
  }
};

const parceWidgetObjectSave = (blockContent, { props }) => {
  const result = {};
  for (const key of props) {
    result[key.name] = selectDataFromProperty(blockContent, key);
  }
  return result;
};

const generateClassFromWidget = (widgetObject) => {
  class WidgetClass {
    static get toolbox() {
      return {
        title: widgetObject.displayName,
        icon:
          '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
      };
    }

    constructor({ data }) {
      console.log(data);
      this.data = data;
      this.widget = widgetObject;
    }

    render = () => parceWidgetObjectView(this.widget);

    save = blockContent => parceWidgetObjectSave(blockContent, this.widget);
  }

  return WidgetClass;
};

export const parcer = {
  generateProperty,
  parceWidgetObjectView,
  selectDataFromProperty,
  parceWidgetObjectSave,
  generateClassFromWidget
};
