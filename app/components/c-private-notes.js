import Ember from 'ember';

export default Ember.Component.extend({

  modelName : null, // we can call component with modelName,
  modelId   : null, // Id,
  model     : null, // and model or without it.
  store     : Ember.inject.service(),

  // We purposely do not use init(),
  // because it is called only once when element is created.
  // We want to be sure that we update variables when parameters change.
  //
  // init() {
  //   this._super(...arguments);
  // },

  // when anything changes, didReceiveAttrs is called so model is loaded
  // from server
  didReceiveAttrs() {
    this._super(...arguments);

    var model = this.get('model');
    // if model exists, load name and id:
    if (model) {
      this.set('modelName', model.constructor.modelName);
      this.set('modelId', model.get('id'));
    }
    // load from the server:
    this.set('privateNotes', this.loadPrivateNotes());
    // new empty note is created:
    this.set('newNote', this.createEmptyNote());
  },

  // load from the server:
  loadPrivateNotes() {
    var privateNotes = this.get('store').query('private-note', {
      'model-name': this.get('modelName'),
      'model-id'  : this.get('modelId')
    });
    return privateNotes;
  },

  // new empty note is created:
  createEmptyNote() {
    var newRow = this.get('store').createRecord('private-note', {
      'modelName': this.get('modelName'),
      'modelId'  : this.get('modelId'),
      'message'  : ''
    });
    return newRow;
  },

  actions: {

    // the user filled note and clicked "save" button:
    insertNote() {
      this.get("newNote").save().then((row) => {
        if (this.notifications) {
          this.notifications.info('Uloženo');
        }
        // after saving reload notes from the server and create new empty note
        this.set('privateNotes', this.loadPrivateNotes());
        this.set('newNote', this.createEmptyNote());
      });
    },
  }

});
