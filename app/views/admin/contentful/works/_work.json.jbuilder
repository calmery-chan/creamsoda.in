# frozen_string_literal: true

json.id work.id
json.title work.title
json.description work.description
json.thumbnails do
  json.array! work.thumbnails do |thumbnail|
    json.url thumbnail.url
    json.width thumbnail.file.details['image']['width']
    json.height thumbnail.file.details['image']['height']
  end
end
json.model do
  json.url work.model.file.url
  json.file_size work.model.file.file.details['size']
  json.content_type work.model.file.file.content_type
  json.call(
    work.model,
    :position_x,
    :position_y,
    :position_z,
    :rotate_x,
    :rotate_y,
    :rotate_z,
    :scale_x,
    :scale_y,
    :scale_z
  )
end