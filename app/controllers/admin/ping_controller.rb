# frozen_string_literal: true

class Admin::PingController < Admin::ApplicationController
  def index
    status 200
  end
end
