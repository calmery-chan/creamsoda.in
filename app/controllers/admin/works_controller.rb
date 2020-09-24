# frozen_string_literal: true

class Admin::WorksController < Admin::ApplicationController
  def index
    @works = ApplicationContent::Work.all.load
  end
end
