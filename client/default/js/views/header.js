HeaderView = Backbone.View.extend({
  el: '#fh_wufoo_header',

  events: {
    'click li.fh_wufoo_home': 'showHome',
    'click li.fh_wufoo_drafts': 'showDrafts',
    'click li.fh_wufoo_pending': 'showPending'
  },
  
  templates: {
    list: '<ul class="segmented-controller"></ul>',
    forms_button: '<li class="fh_wufoo_home"><a href="#">Forms</a></li>',
    drafts_button: '<li class="fh_wufoo_drafts"><a href="#">Drafts<span class="count"></span></a></li>',
    pending_button: '<li class="fh_wufoo_pending"><a href="#">Pending<span class="count"></span></a></li>'
  },

  initialize: function() {
    this.undelegateEvents();
    _.bindAll(this, 'render', 'showHome', 'showDrafts', 'showPending', 'updateCounts');

    App.collections.drafts.bind('add remove reset', this.updateCounts, this);
    App.collections.pending.bind('add remove reset', this.updateCounts, this);

    this.render();
  },

  render: function() {
    var self = this;

    console.log('render headerView');
    $(this.el).empty();

    var list = $(_.template(this.templates.list, {}));
    list.append(this.templates.forms_button);
    list.append(this.templates.drafts_button);
    list.append(this.templates.pending_button);

    $(this.el).append(list);
    $(this.el).show();
  },

  showHome: function() {
    this.hideAll();
    App.views.form_list.show();
  },

  showDrafts: function() {
    this.hideAll();
    App.views.drafts_list.show();
  },

  showPending: function() {
    this.hideAll();
    App.views.pending_list.show();
  },

  hideAll: function() {
    window.scrollTo(0, 0);
    App.views.form_list.hide();
    App.views.drafts_list.hide();
    App.views.pending_list.hide();
    if (_.isObject(App.views.form)) {
      App.views.form.hide();
    }
  },

  markActive: function(tab_class) {
    $('li', this.el).removeClass('active');
    $(tab_class, this.el).addClass('active');
  },

  updateCounts: function() {
    // TODO: DRY
    var drafts_count = App.collections.drafts.length;
    if (drafts_count > 0) {
      $('.fh_wufoo_drafts .count', this.el).text(drafts_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_drafts .count', this.el).hide();
    }

    var pending_count = App.collections.pending.length;
    if (pending_count > 0) {
      $('.fh_wufoo_pending .count', this.el).text(pending_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_pending .count', this.el).hide();
    }
  }
});