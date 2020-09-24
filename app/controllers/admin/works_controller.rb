# frozen_string_literal: true

class Admin::WorksController < Admin::ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { @works = ApplicationContent::Work.all.load }
    end
  end
end
