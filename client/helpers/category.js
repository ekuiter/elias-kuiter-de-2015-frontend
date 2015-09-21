Template.categoryView.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var categorySlug = App.helpers.getCategorySlug();
    if (categorySlug) {
      self.subscribe("projectsInCategory", categorySlug);
      self.subscribe("imagesForCategory", categorySlug);
    }
  });
  self.autorun(function() {
    if (self.subscriptionsReady() && App.helpers.getCategorySlug() && !App.helpers.getCategory())
      App.renderNotFound();
  });
  self.clearTimeout = function() {
    if (self.timeout) {
      Meteor.clearTimeout(self.timeout);
      self.timeout = null;
    }
  };
  self.autorun(function() {
    self.clearTimeout();
    if (App.isRoute("category")) {
      if (self.subscriptionsReady()) {
        self.timeout = Meteor.setTimeout(function() {
          self.$(".projects .item img").addClass("visible");
        }, App.initDuration);
      }
    } else if (self.view._domrange)
      self.$(".projects .item img").removeClass("visible");
  });
});

Template.categoryView.onDestroyed(function() {
  this.clearTimeout();
});

Template.categoryView.helpers({
  category: function() {
    return App.helpers.getCategory();
  },
  hasCategorySlug: function() {
    return App.helpers.getCategorySlug();
  },
  isCategoryRoute: function() {
    return App.isRoute("category");
  },
  isNotFound: function() {
    return Session.get("isNotFound");
  },
  size: function() {
    return App.isRoute("category") ? "large" : "small";
  },
  active: function() {
    return App.helpers.getProjectSlug() === this.slug ? "active" : "";
  }
});