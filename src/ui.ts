import { Site } from './types';

function buildSitesList() {
  const itemList = <HTMLLIElement>document.createElement('li');
  return itemList;
}

function buildEnabledCheckbox(site: Site) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.value = site.url;
  input.checked = site.enabled;
  input.setAttribute('id', site.url);
  return input;
}

function buildSiteDeleteBtn(site: Site) {
  const input = document.createElement('input');
  input.type = 'button';
  input.value = 'X';
  input.setAttribute('data-url', site.url);
  input.setAttribute('name', site.url);
  return input;
}

function buildSiteElement(site: Site) {
  const elem = document.createElement('label');
  elem.setAttribute('class', 'site-url');
  elem.setAttribute('for', site.url);
  elem.textContent = site.url;
  return elem;
}

const ui = {
  buildSitesList,
  buildSiteDeleteBtn,
  buildSiteElement,
  buildEnabledCheckbox,
};

export default ui;
