# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Admin::SerialCodesController, type: :controller do
  describe '#index' do
    let!(:serial_code_1) { SerialCode.create! }
    let!(:serial_code_2) { SerialCode.create! }
    let!(:serial_code_3) { SerialCode.create! }
    let!(:serial_code_4) { SerialCode.create! }

    it 'ID 昇順で取得できる' do
      get :index, format: :json

      expect(response).to have_http_status :ok

      data = JSON.parse(response.body)['data']

      expect(data.size).to eq 4
      expect(data[0]['serial_code']).to eq serial_code_1.serial_code
      expect(data[1]['serial_code']).to eq serial_code_2.serial_code
      expect(data[2]['serial_code']).to eq serial_code_3.serial_code
      expect(data[3]['serial_code']).to eq serial_code_4.serial_code
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
    describe 'ID に対応した SerialCode が存在するとき' do
      let!(:serial_code_state_created) { SerialCode.create!(state: SerialCode.states[:created]) }
      let!(:serial_code_state_allowed) { SerialCode.create!(state: SerialCode.states[:allowed]) }
      let!(:serial_code_state_denied) { SerialCode.create!(state: SerialCode.states[:denied]) }

      context 'SerialCode の state を created から' do
        it 'allowed に変更することができる' do
          put :update, format: :json, params: { id: serial_code_state_created.id, state: :allowed }
          expect(response).to have_http_status :ok
          expect(JSON.parse(response.body)['data']['state']).to eq 'allowed'
        end

        it 'denied に変更することができる' do
          put :update, format: :json, params: { id: serial_code_state_created.id, state: :denied }
          expect(response).to have_http_status :ok
          expect(JSON.parse(response.body)['data']['state']).to eq 'denied'
        end
      end

      context 'SerialCode の state を allowed から' do
        it 'created に変更することはできない' do
          put :update, format: :json, params: { id: serial_code_state_allowed.id, state: :created }
          expect(response).to have_http_status :bad_request
        end

        it 'denied に変更することができる' do
          put :update, format: :json, params: { id: serial_code_state_allowed.id, state: :denied }
          expect(response).to have_http_status :ok
          expect(JSON.parse(response.body)['data']['state']).to eq 'denied'
        end
      end

      context 'SerialCode の state を denied から' do
        it 'created に変更することはできない' do
          put :update, format: :json, params: { id: serial_code_state_denied.id, state: :created }
          expect(response).to have_http_status :bad_request
        end

        it 'allowed に変更することができる' do
          put :update, format: :json, params: { id: serial_code_state_denied.id, state: :allowed }
          expect(response).to have_http_status :ok
          expect(JSON.parse(response.body)['data']['state']).to eq 'allowed'
        end
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
      it 'SerialCode の state が created であれば削除できる' do
        post :destroy, format: :json, params: { id: serial_code_state_created.id }

        expect(response).to have_http_status :ok
      end

      it 'SerialCode の state が created 以外であれば削除できない' do
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
