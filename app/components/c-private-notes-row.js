import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  canBeDeleted : Ember.computed('privateNote', function () {
    let noteTime = this.get('privateNote.datetime');
    let userId = this.get('session.user.id');

    // is it the note of this user?
    let isSameUser = this.get('privateNote.userUid') == userId;
    // saved time of note is not older then 15 minutes?
    let isFreshRecord = moment(noteTime).format() > moment().subtract(15, 'minutes').format();
    // => can be deleted, will show the trash icon
    return isSameUser && isFreshRecord;

  }),

  actions: {

    // the user clicked 'delete note' button:
    deleteNote(privateNote) {
      console.log('deleteNote');
      privateNote.deleteRecord();
      privateNote.save();
    },
  },


});
