import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  
  modelId   : DS.attr('number'),
  modelName : DS.attr('string'),
  datetime  : DS.attr('date'),
  type      : DS.attr('string'),
  userName  : DS.attr('string'),
  userUid   : DS.attr('number'),
  message   : DS.attr(),

});
