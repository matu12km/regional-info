import { Heading, VStack, Text } from '@chakra-ui/react'
import { primaryTextColor } from '../theme'

export const Concept = () => {
  return (
      <VStack py={16}>
        <Heading color={primaryTextColor}>このサイトについて</Heading>
      <Text>
        どこか地域へ移住したいと思った時、地域おこし協力隊になってみたいなと思った時、
        どのように情報を集めていますか？インターネットで調べると様々な情報が出てきますが、
        本当に知りたいことを知ることができますか？沢山の情報が出てきて訳が分からなくなってしまっていませんか？
        そんな悩みを解決したくこのサイトを立ち上げました。
        的ななんか目的とか願いとか書いておく場所
      </Text>
      </VStack>
  )
}