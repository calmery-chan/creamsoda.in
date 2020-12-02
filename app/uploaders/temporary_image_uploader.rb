# frozen_string_literal: true

class TemporaryImageUploader < CarrierWave::Uploader::Base
  TEMPORARY_IMAGE_FOLDER_PATH = "temporary/images"

  def store!(image)
    @asset = Cloudinary::Uploader.upload image, :folder => TEMPORARY_IMAGE_FOLDER_PATH, :public_id => public_id
  end

  def url
    @asset['secure_url']
  end

  private

  def public_id
    @id = SecureRandom.uuid
  end
end
