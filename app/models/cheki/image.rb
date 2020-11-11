# frozen_string_literal: true

class Cheki::Image < ApplicationRecord
  after_initialize :set_id

  mount_uploader :image, ImageUploader

  def image_url
    return Cloudinary::Utils.cloudinary_url(image.public_id, secure: true) if Rails.env.production?

    image.url
  end

  # rubocop:disable Metrics/MethodLength
  def og_image_url
    if Rails.env.production?
      return Cloudinary::Utils.cloudinary_url(
        image.public_id,
        background: '#fff',
        crop: :pad,
        height: 630,
        width: 1200,
        secure: true
      )
    end

    image.url
  end
  # rubocop:enable Metrics/MethodLength

  private

  def set_id
    self.id ||= SecureRandom.uuid
  end
end
