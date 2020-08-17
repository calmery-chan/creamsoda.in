# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe AdminController, type: :controller do
  let!(:name) { 'name' }
  let!(:password) { 'password' }

  before do
    administrator = Administrator.new
    administrator.name = name
    administrator.password = password
    administrator.save!
  end

  describe 'create' do
    it 'name と password が正しく指定されているとき、200 となる' do
      post :create, params: { name: name, password: password }
      expect(response).to have_http_status :ok
    end

    it 'name は正しいが password が間違っているとき、401 となる' do
      post :create, params: { name: name, password: 'wrong password' }
      expect(response).to have_http_status :unauthorized
    end

    it 'password は正しいが name が間違っているとき、401 となる' do
      post :create, params: { name: 'wrong name', password: password }
      expect(response).to have_http_status :unauthorized
    end

    it 'password が指定されていないとき、401 となる' do
      post :create, params: { name: name }
      expect(response).to have_http_status :unauthorized
    end

    it 'name が指定されていないとき、401 となる' do
      post :create, params: { password: password }
      expect(response).to have_http_status :unauthorized
    end

    it 'name と password が指定されていないとき、401 となる' do
      post :create
      expect(response).to have_http_status :unauthorized
    end
  end
end
# rubocop:enable Metrics/BlockLength
