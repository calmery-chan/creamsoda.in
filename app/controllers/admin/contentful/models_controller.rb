# frozen_string_literal: true

class Admin::Contentful::ModelsController < Admin::ApplicationController
  def create
    management = Contentful::Management::Client.new(ENV['CONTENTFUL_MANAGEMENT_TOKEN'])
    environment = management.environments(ENV['CONTENTFUL_SPACE']).find(ENV['CONTENTFUL_ENVIRONMENT'])

    file_name = params[:data].original_filename
    content_type = params[:data].content_type

    file = Contentful::Management::File.new
    file.properties[:contentType] = content_type
    file.properties[:fileName] = file_name
    file.properties[:uploadFrom] = management
                                   .uploads(ENV['CONTENTFUL_SPACE'])
                                   .create(params[:data].tempfile.path)
                                   .to_link_json

    asset = environment.assets.create(title: file_name, file: file).process_file
    asset.publish

    @model = Contentful::Model.create
    @model.name = file_name.split(".glb").first
    @model.file = asset
    @model.position_x = 0
    @model.position_y = 0
    @model.position_z = 0
    @model.rotate_x = 0
    @model.rotate_y = 0
    @model.rotate_z = 0
    @model.scale_x = 1
    @model.scale_y = 1
    @model.scale_z = 1
    @model.save
    @model.publish
  end

  def update
    management = Contentful::Management::Client.new(ENV['CONTENTFUL_MANAGEMENT_TOKEN'])
    environment = management.environments(ENV['CONTENTFUL_SPACE']).find(ENV['CONTENTFUL_ENVIRONMENT'])
    model = environment.entries.find(params[:id])

    if model.instance_of? Contentful::Management::NotFound
      status 404
      return
    end

    model.position_x = params['position']['x']
    model.position_y = params['position']['y']
    model.position_z = params['position']['z']
    model.rotate_x = params['rotation']['x'].to_i
    model.rotate_y = params['rotation']['y'].to_i
    model.rotate_z = params['rotation']['z'].to_i
    model.scale_x = params['scale']['x']
    model.scale_y = params['scale']['y']
    model.scale_z = params['scale']['z']

    model.save
    model.publish

    status 200
  end
end
