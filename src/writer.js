const path = require('path');
const fse = require('fs-extra');
// requires
const utils = require('./program-utils');
const wutils = require('./writer-utils');
const constants = require('./core/constants');


/**
*
* Write Destination File
*
*/
const Writer = {

  _callback: false,

  /**
  *
  * Returns full filepath for output file
  * With extension from user selected tempates
  *
  */
  getoutputfile(destination, ext) {
    let obj = null;
    let dest = destination;
    const isdotfile = wutils.isdotfile(dest);
    const hasextension = wutils.hasextension(dest);
    const istrailingdot = wutils.istrailingdot(dest);

    //
    // add extension to output file name
    // for user selected template
    if (!isdotfile && !istrailingdot && !hasextension) {
      dest += ext;
    } else if (istrailingdot && !hasextension) {
      obj = path.parse(destination);
      dest = wutils.removetrailingdot(obj.base);
      dest = path.join(obj.dir, dest);
    }
    return dest;
  },

  _write(destinationfile, ext, rstream) {
    // get absolute fullpath to output file from current dir
    let wstream = null;
    const dest = this.getoutputfile(destinationfile, ext);
    const outputpath = path.relative(constants.CURRENT_WD, dest);

    // process.stdout.cursorTo(0);
    utils.debug(`Write: ${outputpath}${constants.NL}`);
    // process.stdout.clearLine(1);
    // check if path exists and file can be written
    fse.ensureFileSync(outputpath);
    // write template content into output
    wstream = fse.createWriteStream(outputpath);
    rstream.pipe(wstream);
  },

  writeslow(files, templates) {
    let msg = '';
    let tpl = null;
    let ext = null;
    let type = null;
    let file = null;
    let otype = false;
    let rstream = null;
    const self = this;
    const keys = Object.keys(templates);
    function __onstreamend__ () {
      if (!files.length) {
        self._callback();
      }
    }
    while (files.length) {
      file = files.shift();
      type = wutils.gettype(file, keys);
      if (!type) {
        msg = `Unable to write file '${file}'. Unknow type`;
        utils.error(msg, false);
      } else if (type !== otype) {
        // create a new stream
        tpl = templates[type];
        rstream = fse.createReadStream(tpl);
        rstream.on('end', __onstreamend__);
      }
      if (type) {
        otype = type;
        ext = wutils.getextension(tpl);
        // remove file current type extension
        file = file.replace(`.${type}`, '');
        this._write(file, ext, rstream);
      }
    }
    return false;
  },

  writefast(files, template) {
    let file,
    self = this,
    extension = wutils.getextension(template),
    rstream = fse.createReadStream(template);
    rstream.on('end', () => {
      if (!files.length) {
        self._callback();
      }
    });
    while (files.length) {
      file = files.shift();
      this._write(file, extension, rstream);
    }
    return true;
  },
};

/**
*
* Main entry point function
*
*/
module.exports = function (outputfiles, template, callback) {
  Writer._callback = callback;
  let isfast,
  files = [].concat(outputfiles);
  try {
    // if template is a string will create only once stream reader
    if (typeof template === 'string') {
      isfast = Writer.writefast(files, template);
    }
    // else wil create multiple stream for each template
    isfast = Writer.writeslow(files, template);
  } catch (e) {
    utils.exit('Error while writing file(s)');
  }
  return isfast;
};

// units tests
module.exports.writer = Writer;
