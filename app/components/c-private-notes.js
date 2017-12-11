import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);

    var privateNotes = this.get('store').query('private-note', { 'model-name': ...., 'model-id': .... });
    this.set("privateNotes", privateNotes);
  }

  actions: {
    insertNote() {
       // Vytvoří záznam, naplní hodnotami a uloží se.
    }
  }

});
