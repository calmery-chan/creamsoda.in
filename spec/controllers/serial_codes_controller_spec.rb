# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SerialCodesController, type: :controller do
  describe '#show' do
    let!(:serial_code_state_created) { SerialCode.create!(state: SerialCode.states[:created]) }
    let!(:serial_code_state_allowed) { SerialCode.create!(state: SerialCode.states[:allowed]) }
    let!(:serial_code_state_denied) { SerialCode.create!(state: SerialCode.states[:denied]) }

    context 'シリアルコードに対応した SerialCode が存在するとき' do
      it 'SerialCode の state が created であれば、HTTP ステータスコードは 401 となる' do
        get :show, format: :json, params: { serial_code: serial_code_state_created.serial_code }

        expect(response).to have_http_status :unauthorized
      end

      it 'SerialCode の state が allowed であれば、HTTP ステータスコードは 200 となる' do
        get :show, format: :json, params: { serial_code: serial_code_state_allowed.serial_code }

        expect(response).to have_http_status :ok
      end

      it 'SerialCode の state が denied であれば、HTTP ステータスコードは 403 となる' do
        get :show, format: :json, params: { serial_code: serial_code_state_denied.serial_code }

        expect(response).to have_http_status :forbidden
      end
    end

    context 'シリアルコードに対応した SerialCode が存在しないとき' do
      it 'HTTP ステータスコードは 401 となる' do
        get :show, format: :json, params: { serial_code: 'serial_code' }

        expect(response).to have_http_status :unauthorized
      end
    end
  end
end
