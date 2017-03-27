import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  progress: null,
  filesDidChange: function(files) {
    const uploader = EmberUploader.Uploader.create({
      url: this.get('url')
    });

    if (!Ember.isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(files[0]);
    }

    uploader.on('progress', e => {
      this.set('progress', e.percent);
      // Handle progress changes
      // Use `e.percent` to get percentage
    });

    uploader.on('didUpload', e => {
      this.set('progress', 100);
      this.set('message', 'Success!');
    });
  }
});