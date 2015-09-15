Template.categoriesView.onCreated(function() {
  this.subscribe("categories");
  this.animatable = new ReactiveVar(true);
});

Template.categoriesView.helpers({
  categories: function() {
    return Categories.find();
  },
  size: function() {
    if (App.helpers.isRoute("home"))
      return "large";
    else {
      Template.instance().animatable.set(false);
      return "small";
    }
  },
  animatable: function() {
    return Template.instance().animatable.get() ? "animatable" : "";
  },
  active: function() {
    return App.helpers.getCategorySlug() === this.slug ? "active" : "";
  }
});