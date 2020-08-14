# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Admin::SerialCodesController, type: :controller do
  describe '#index' do
    before do
      15.times do
        SerialCode.create!
      end
    end

    it 'ID 昇順で取得できる' do
      get :index, format: :json

      data = JSON.parse(response.body)['data']
      ids = data.map { |s| s['id'] }

      expect(ids).to match ids.sort
    end

    it '1 ページ目の SerialCode を取得できる' do
      get :index, format: :json

      data = JSON.parse(response.body)['data']

      expect(data.size).to eq 10
    end

    it '2 ページ目の SerialCode を取得できる' do
      get :index, format: :json, params: { page: 2 }

      data = JSON.parse(response.body)['data']

      expect(data.size).to eq 5
    end
  end

  describe '#create' do
    it 'SerialCode を作成できる' do
      expect { post :create, format: :json }.to change(SerialCode, :count).from(0).to(1)
    end
  end

  describe '#show' do
    let!(:serial_code) { SerialCode.create! }

    context 'ID に対応した SerialCode が存在するとき' do
      before do
        get :show, format: :json, params: { id: serial_code.id }
      end

      it 'HTTP ステータスコードは 200 となる' do
        expect(response).to have_http_status :ok
      end

      it 'SerialCode を取得できる' do
        expect(JSON.parse(response.body)['data']['serial_code']).to eq serial_code.serial_code
      end
    end

    context 'ID に対応した SerialCode が存在しないとき' do
      it 'HTTP ステータスコードは 404 となる' do
        get :show, format: :json, params: { id: serial_code.id + 1 }

        expect(response).to have_http_status :not_found
      end
    end
  end

  describe '#update' do
    context 'ID に対応した SerialCode が存在するとき' do
      let!(:serial_code_state) { SerialCode.create!(state: SerialCode.states[:created]) }

      it '更新できる' do
        put :update, format: :json, params: { id: serial_code_state.id, state: :allowed }

        expect(response).to have_http_status :ok
      end

      it 'ActiveRecord::RecordNotSaved が呼ばれたとき、400 を返す' do
        allow_any_instance_of(SerialCode).to receive(:update!).and_raise ActiveRecord::RecordNotSaved
        put :update, format: :json, params: { id: serial_code_state.id }

        expect(response).to have_http_status :bad_request
      end
    end

    context 'ID に対応した SerialCode が存在しないとき' do
      it 'HTTP ステータスコードは 404 となる' do
        put :update, format: :json, params: { id: 0 }

        expect(response).to have_http_status :not_found
      end
    end
  end

  describe '#destroy' do
    let!(:serial_code_state_created) { SerialCode.create!(state: SerialCode.states[:created]) }
    let!(:serial_code_state_allowed) { SerialCode.create!(state: SerialCode.states[:allowed]) }

    context 'ID に対応した SerialCode が存在するとき' do
      it '削除できる' do
        post :destroy, format: :json, params: { id: serial_code_state_created.id }

        expect(response).to have_http_status :ok
      end

      it 'ActiveRecord::RecordNotDestroyed が呼ばれたとき、400 を返す' do
        allow_any_instance_of(SerialCode).to receive(:destroy!).and_raise ActiveRecord::RecordNotDestroyed
        post :destroy, format: :json, params: { id: serial_code_state_allowed.id }

        expect(response).to have_http_status :bad_request
      end
    end

    context 'ID に対応した SerialCode が存在しないとき' do
      it 'HTTP ステータスコードは 404 となる' do
        post :destroy, format: :json, params: { id: 0 }

        expect(response).to have_http_status :not_found
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
