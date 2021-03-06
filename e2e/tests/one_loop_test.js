/* eslint-disable func-names */

const {
  sampleUrls,
  shortSampleUrls,
  E2E_WAIT_TIME: WAIT_TIME,
  E2E_PRESENT_WAIT_TIME: PRESENT_WAIT_TIME
} = require('../e2e_helper');

module.exports = {
  after(browser) {
    browser.end();
  },

  'Go to top page': browser => {
    browser.page.index().navigate().waitForElementVisible('body', PRESENT_WAIT_TIME);
  },

  'Add musics': browser => {
    browser.page
      .index()
      .setValue('@trackUrlField', sampleUrls.join(','))
      .submitForm('@trackSubmitButton')
      .waitForElementPresent('a.playlist-content:nth-child(5)', 10000)
      .api.pause(WAIT_TIME);
  },

  'Set one loop mode': browser => {
    browser.page
      .index()
      .click('@noLoopButton')
      .waitForElementPresent('@oneLoopButton', PRESENT_WAIT_TIME)
      .assert.elementPresent('@oneLoopButton')
      .api.pause(WAIT_TIME);
  },

  'Play music': browser => {
    browser.page
      .index()
      .moveToElement('@playerBlock', 10, 10)
      .click('@playButton')
      .waitForElementPresent('@pauseButton', PRESENT_WAIT_TIME)
      .assert.hasPlaylistLength(5)
      .assert.currentTrackNumEquals(1)
      .api.pause(WAIT_TIME);
  },

  'Play next music': browser => {
    browser.page
      .index()
      .click('@nextButton')
      .waitForElementPresent(
        '.playlist-content:nth-child(2) .thumbnail-wrapper i',
        PRESENT_WAIT_TIME
      )
      .assert.elementPresent('@pauseButton')
      .assert.hasPlaylistLength(5)
      .assert.currentTrackNumEquals(2)
      .api.pause(WAIT_TIME);
  },

  'Play prev music': browser => {
    browser.page
      .index()
      .click('@prevButton')
      .waitForElementPresent(
        '.playlist-content:nth-child(1) .thumbnail-wrapper i',
        PRESENT_WAIT_TIME
      )
      .assert.elementPresent('@pauseButton')
      .assert.hasPlaylistLength(5)
      .assert.currentTrackNumEquals(1)
      .api.pause(WAIT_TIME);
  },

  'Play specified music': browser => {
    browser.page
      .index()
      .click('a.playlist-content:nth-child(3)')
      .waitForElementPresent(
        '.playlist-content:nth-child(3) .thumbnail-wrapper i',
        PRESENT_WAIT_TIME
      )
      .assert.elementPresent('@pauseButton')
      .assert.hasPlaylistLength(5)
      .assert.currentTrackNumEquals(3)
      .api.pause(WAIT_TIME);
  },

  'Delete current music': browser => {
    browser.page
      .index()
      .click('a.playlist-content:nth-child(3) i[title=Delete]')
      .waitForElementPresent('@playButton', PRESENT_WAIT_TIME)
      .assert.elementPresent('@playButton')
      .assert.hasPlaylistLength(4)
      .assert.currentTrackNumEquals(3)
      .api.pause(WAIT_TIME);
  },

  'Add short music': browser => {
    browser.page
      .index()
      .setValue('@trackUrlField', shortSampleUrls[0])
      .submitForm('@trackSubmitButton')
      .waitForElementPresent('a.playlist-content:nth-child(5)', PRESENT_WAIT_TIME)
      .assert.hasPlaylistLength(5);
  },

  'Play short music': browser => {
    browser.page
      .index()
      .click('a.playlist-content:nth-child(5)')
      .waitForElementPresent('@pauseButton', PRESENT_WAIT_TIME);
  },

  'Wait till end': browser => {
    browser
      .pause(3000)
      .page.index()
      .assert.elementPresent('@pauseButton')
      .assert.hasPlaylistLength(5)
      .assert.currentTrackNumEquals(5);
  }
};
