function projectPath(imageNumber) {
  imageNumber = imageNumber ? "/" + imageNumber : "";
  return "/" + App.helpers.getCategorySlug() + "/" + App.helpers.getProjectSlug() + imageNumber;
}

Template.projectRoute.helpers({
  columns: function() {
    return this.twoColumnLayout ? "columns-2" : "columns-1";
  },
  images: function() {
    return this.images.map(function(imageUrl, index) {
      return { imageUrl: imageUrl, imageNumber: index + 1 };
    });
  },
  active: function(imageNumber) {
    return App.helpers.getImageNumber() === imageNumber ? "active" : "";
  },
  hasImageNumber: function() {
    return App.helpers.getImageNumber();
  },
  projectPath: projectPath
});

Template.projectImage.helpers({
  imageUrl: function() {
    var imageUrl = this.images[App.helpers.getImageNumber() - 1];
    if (!imageUrl)
      App.renderNotFound();
    return imageUrl;
  },
  nextImageNumber: function() {
    var imageNumber = App.helpers.getImageNumber();
    return imageNumber >= this.images.length ? 1 : imageNumber + 1;
  },
  projectPath: projectPath
});