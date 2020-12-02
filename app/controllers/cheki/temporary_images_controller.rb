# frozen_string_literal: true

class Cheki::TemporaryImagesController < Cheki::ApplicationController
  def create
    image = params[:image]

    return status 400 if image.nil?

    uploader = TemporaryImageUploader.new
    uploader.store!(image)

    @url = uploader.url
  end
end
