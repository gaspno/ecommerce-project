package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Country;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig  implements RepositoryRestConfigurer {



    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager=theEntityManager;
    }



    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] notSupportedActions={HttpMethod.DELETE,HttpMethod.POST,HttpMethod.PUT};


        disableHttpMethods(Product.class,config, notSupportedActions);
        disableHttpMethods(ProductCategory.class,config, notSupportedActions);
        disableHttpMethods(Country.class,config, notSupportedActions);
        disableHttpMethods(State.class,config, notSupportedActions);


        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] notSupportedActions) {
        config.getExposureConfiguration().forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(notSupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(notSupportedActions));
    }



    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();
        List<Class>entityClasses=new ArrayList<>();
        for(EntityType temp:entities){
            entityClasses.add(temp.getJavaType());
        }
        Class []domainType=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainType);
    }
}
