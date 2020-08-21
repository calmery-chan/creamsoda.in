# frozen_string_literal: true

class Admin::Contentful::WorksController < Admin::ApplicationController
  def index
    @works = Contentful::Work.all.load
  end
end
