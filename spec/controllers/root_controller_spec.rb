require 'rails_helper'

RSpec.describe RootController, type: :controller do
  it 'index' do
    get :index
    expect(response).to have_http_status 200
  end
end
