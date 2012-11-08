PendingSubmittingItemView = PendingItemView.extend({
  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts">Saved: <%= timestamp %></span><span class="chevron"></span>',
  },

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  }
});