# frozen_string_literal: true

class TemporaryImageUploader < CarrierWave::Uploader::Base
  TEMPORARY_IMAGE_FOLDER_PATH = "temporary/images"

  if Rails.env.production?
    def store!(image)
      @asset = Cloudinary::Uploader.upload image, :folder => TEMPORARY_IMAGE_FOLDER_PATH, :public_id => public_id
    end

    def url
      @asset['secure_url']
    end
  else
    storage :file

    def asset_host
      'http://localhost:5000'
    end

    def filename
      "#{public_id}.#{file.extension}"
    end

    def store_dir
      "uploads/#{TEMPORARY_IMAGE_FOLDER_PATH}"
    end
  end

  private

  def public_id
    @id = SecureRandom.uuid
  end
end
