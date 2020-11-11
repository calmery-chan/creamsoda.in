# frozen_string_literal: true

class ImageUploader < CarrierWave::Uploader::Base
  if Rails.env.production?
    include Cloudinary::CarrierWave

    def public_id
      "#{model.model_name.collection}/#{model.id}"
    end
  else
    storage :file

    def asset_host
      'http://localhost:5000'
    end

    def filename
      "#{model.id}.#{file.extension}"
    end

    def store_dir
      "uploads/#{model.model_name.collection}"
    end
  end
end
