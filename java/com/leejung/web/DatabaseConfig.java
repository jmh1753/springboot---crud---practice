package com.leejung.web; //여기바꾸기

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.transaction.annotation.EnableTransactionManagement;
/**
* DatabaseConfig
*/
@Configuration
@MapperScan(basePackages = "com.leejung.web.mapper")  //여기바꾸기
@EnableTransactionManagement
public class DatabaseConfig {
@Bean
public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
sessionFactory.setDataSource(dataSource);
PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
sessionFactory.setMapperLocations(resolver.getResources("classpath:com/leejung/web/mapper/*.xml")); //여기바꾸기
return sessionFactory.getObject();
}
@Bean
public SqlSessionTemplate sessionTemplate(SqlSessionFactory sqlSessionFactory){
final SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory);
return sqlSessionTemplate;
}
}