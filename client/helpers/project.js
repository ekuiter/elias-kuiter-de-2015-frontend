function projectPath(imageNumber) {
  imageNumber = imageNumber ? "/" + imageNumber : "";
  return "/" + App.helpers.getCategorySlug() + "/" + App.helpers.getProjectSlug() + imageNumber;
}

Template.projectRoute.helpers({
  columns: function() {
    return this.twoColumnLayout ? "columns-2" : "columns-1";
  },
  images: function() {
    var self = this;
    return self.imageIds.map(function(imageId, index) {
      var imageNumber = index + 1;
      return { imageNumber: imageNumber, imageUrl: self.imageUrl(imageNumber, "medium") };
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
    var imageNumber = App.helpers.getImageNumber();
    if (!this.imageIds[imageNumber - 1])
      App.renderNotFound();
    return this.imageUrl(imageNumber, "large");
  },
  nextImageNumber: function() {
    var imageNumber = App.helpers.getImageNumber();
    return imageNumber >= this.imageIds.length ? 1 : imageNumber + 1;
  },
  projectPath: projectPath
});