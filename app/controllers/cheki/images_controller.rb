# frozen_string_literal: true

class Cheki::ImagesController < Cheki::ApplicationController
  def create
    image = params[:image]

    return status 400 if image.nil?

    @cheki_image = Cheki::Image.new
    @cheki_image.image = image
    @cheki_image.save!
  end

  def show
    @cheki_image = Cheki::Image.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    status 404
  end
end
