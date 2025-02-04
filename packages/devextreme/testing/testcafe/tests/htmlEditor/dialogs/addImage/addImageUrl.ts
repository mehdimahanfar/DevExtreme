import { createScreenshotsComparer } from 'devextreme-screenshot-comparer';
import HtmlEditor from '../../../../model/htmlEditor';
import url from '../../../../helpers/getPageUrl';
import createWidget from '../../../../helpers/createWidget';
import { BASE64_IMAGE_1, BASE64_IMAGE_2 } from './images/base64';
import { isMaterial, testScreenshot } from '../../../../helpers/themeUtils';

fixture.disablePageReloads`HtmlEditor - add image url`
  .page(url(__dirname, '../../../containerQuill.html'));

const ADD_IMAGE_POPUP_CONTENT_SELECTOR = '.dx-htmleditor-add-image-popup .dx-overlay-content';

test('Image uploader from url appearance', async (t) => {
  const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
  const htmlEditor = new HtmlEditor('#container');

  await t
    .click(htmlEditor.toolbar.getItemByName('image'));

  await t
    .click(htmlEditor.dialog.addImageUrlForm.lockButton.element);

  await t
    .click(htmlEditor.dialog.addImageUrlForm.url.element);

  await testScreenshot(t, takeScreenshot, 'Image uploader from url appearance.png', { element: ADD_IMAGE_POPUP_CONTENT_SELECTOR });

  await t.expect(compareResults.isValid())
    .ok(compareResults.errorMessages());
}).before(async () => createWidget('dxHtmlEditor', {
  height: 600,
  width: 800,
  toolbar: { items: ['image'] },
}));

test('Image url should be validate before wil be inserted by add button click', async (t) => {
  const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
  const htmlEditor = new HtmlEditor('#container');

  await t
    .click(htmlEditor.toolbar.getItemByName('image'))
    .click(htmlEditor.dialog.footerToolbar.addButton.element);

  await t
    .expect(htmlEditor.dialog.addImageUrlForm.url.isInvalid)
    .eql(true);

  await t
    .typeText(htmlEditor.dialog.addImageUrlForm.url.element, BASE64_IMAGE_1, {
      paste: true,
    })
    .click(htmlEditor.dialog.footerToolbar.addButton.element);

  await testScreenshot(t, takeScreenshot, 'add-validated-url-image-by-click.png', { element: htmlEditor.content });

  await t.expect(compareResults.isValid())
    .ok(compareResults.errorMessages());
}).before(async () => {
  await createWidget('dxHtmlEditor', {
    height: 600,
    width: 800,
    imageUpload: {
      tabs: ['url'],
    },
    toolbar: { items: ['image'] },
  });
});

test('Image url should be validate before wil be inserted by add enter press', async (t) => {
  const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
  const htmlEditor = new HtmlEditor('#container');

  await t
    .click(htmlEditor.toolbar.getItemByName('image'));

  await t
    .pressKey('enter')
    .expect(htmlEditor.dialog.addImageUrlForm.url.isInvalid)
    .eql(true);

  await t
    .typeText(htmlEditor.dialog.addImageUrlForm.url.element, BASE64_IMAGE_1, {
      paste: true,
    })
    .pressKey('enter');

  await testScreenshot(t, takeScreenshot, 'editor-add-validated-url-image-by-enter.png', { element: htmlEditor.content });

  await t.expect(compareResults.isValid())
    .ok(compareResults.errorMessages());
}).before(async () => {
  await createWidget('dxHtmlEditor', {
    height: 600,
    width: 800,
    imageUpload: {
      tabs: ['url'],
    },
    toolbar: { items: ['image'] },
  });
});

test('Image url should be updated', async (t) => {
  const { takeScreenshot, compareResults } = createScreenshotsComparer(t);
  const htmlEditor = new HtmlEditor('#container');

  await t
    .click(htmlEditor.toolbar.getItemByName('image'))

    .expect(htmlEditor.dialog.footerToolbar.addButton.text)
    .eql(isMaterial() ? 'ADD' : 'Add');

  await t
    .typeText(htmlEditor.dialog.addImageUrlForm.url.element, BASE64_IMAGE_1, {
      paste: true,
    })
    .click(htmlEditor.dialog.footerToolbar.addButton.element);

  await testScreenshot(t, takeScreenshot, 'editor-add-url-image-before-updated.png', { element: htmlEditor.content });

  await t
    .click(htmlEditor.toolbar.getItemByName('image'))

    .expect(htmlEditor.dialog.footerToolbar.addButton.text)
    .eql(isMaterial() ? 'UPDATE' : 'Update');

  await t
    .typeText(htmlEditor.dialog.addImageUrlForm.url.element, BASE64_IMAGE_2, {
      paste: true,
      replace: true,
    })
    .click(htmlEditor.dialog.footerToolbar.addButton.element);

  await testScreenshot(t, takeScreenshot, 'editor-add-url-image-after-updated.png', { element: htmlEditor.content });

  await t.expect(compareResults.isValid())
    .ok(compareResults.errorMessages());
}).before(async () => {
  await createWidget('dxHtmlEditor', {
    height: 600,
    width: 800,
    imageUpload: {
      tabs: ['url'],
    },
    toolbar: { items: ['image'] },
  });
});
